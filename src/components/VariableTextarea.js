
import React, { useState, useRef, useEffect, forwardRef } from 'react';

export const VariableTextarea = forwardRef(({
    value,
    onChange,
    options = [], // [{ id: 'node-1', type: 'custom', label: 'Node 1' }]
    onValidate, // (isValid, invalidVars) => void
    className,
    style,
    keyboardInteraction, // pass specific keydown handlers from parent
    ...props
}, ref) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const wrapperRef = useRef(null);
    const internalTextareaRef = useRef(null);

    // Combine refs
    const setRefs = (node) => {
        internalTextareaRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    };

    useEffect(() => {
        validateContent(value);
    }, [value, options]);

    const validateContent = (text) => {
        const regex = /\{\{(.*?)\}\}/g;
        let match;
        const invalid = [];
        while ((match = regex.exec(text)) !== null) {
            const varName = match[1].trim();
            // Check if varName exists in options (by id)
            // Assuming variable name used is the ID.
            const exists = options.some(opt => opt.id === varName);
            if (!exists && varName) {
                invalid.push(varName);
            }
        }
        if (onValidate) {
            onValidate(invalid.length === 0, invalid);
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(e);

        // Detect trigger
        const selectionEnd = e.target.selectionEnd;
        const textBeforeCursor = newValue.substring(0, selectionEnd);

        // Check if we are inside a variable definiton: ends with {{...
        // Simple check: last occurrence of {{ is after last occurrence of }}
        const lastOpen = textBeforeCursor.lastIndexOf('{{');
        const lastClose = textBeforeCursor.lastIndexOf('}}');

        if (lastOpen > lastClose) {
            // additional check: ensure no spaces or line breaks? Or allow flexible naming?
            // Assuming variable names don't have {{ or }} inside.
            const queryPart = textBeforeCursor.substring(lastOpen + 2);
            setQuery(queryPart);
            setShowDropdown(true);
            setActiveIndex(0);

            // Calculate position (simple approx or bottom left)
            // For precision we would need a mirror div, but for now we place it at bottom of textarea container
            // If we want it at cursor, we need getCaretCoordinates.
        } else {
            setShowDropdown(false);
        }
    };

    const handleKeyDown = (e) => {
        if (keyboardInteraction) keyboardInteraction(e); // Parent handlers (zoom etc)

        if (showDropdown) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev + 1) % filteredOptions.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                if (filteredOptions[activeIndex]) {
                    selectOption(filteredOptions[activeIndex]);
                }
            } else if (e.key === 'Escape') {
                setShowDropdown(false);
            }
        }
    };

    const selectOption = (option) => {
        if (!internalTextareaRef.current) return;

        const textarea = internalTextareaRef.current;
        const cursor = textarea.selectionEnd;
        const text = value;

        // Find the {{ we are completing
        const textBefore = text.substring(0, cursor);
        const lastOpen = textBefore.lastIndexOf('{{');

        // Construct new text
        const prefix = text.substring(0, lastOpen + 2); // keep {{
        const suffix = text.substring(cursor);

        // Actually we want to replace everything from {{ to cursor with {{option.id}}
        // But wait, the user might have typed partial name

        const newText = text.substring(0, lastOpen) + `{{${option.id}}}` + text.substring(cursor);

        // Prepare synthetic event or just call onChange with new value string if parent supports it
        // But standard textarea onChange expects event.
        // We'll mimic React's event
        const event = {
            target: {
                value: newText,
                name: props.name || 'variable-textarea'
            }
        };
        onChange(event);
        setShowDropdown(false);

        // Restore cursor position? ideally after }}
        // We can't set cursor immediately after state update easily without effect, 
        // but React usually handles uncontrolled inputs. Controlled inputs are trickier.
        // For now, let's assume parent updates value.
        setTimeout(() => {
            if (internalTextareaRef.current) {
                const newCursorPos = lastOpen + option.id.length + 4;
                internalTextareaRef.current.selectionStart = newCursorPos;
                internalTextareaRef.current.selectionEnd = newCursorPos;
                internalTextareaRef.current.focus();
            }
        }, 0);
    };

    const filteredOptions = options.filter(opt =>
        opt.id.toLowerCase().includes(query.toLowerCase()) ||
        (opt.label && opt.label.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <textarea
                ref={setRefs}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={style}
                className={className}
                {...props}
            />

            {showDropdown && filteredOptions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                    {filteredOptions.map((opt, i) => (
                        <div
                            key={opt.id}
                            onClick={() => selectOption(opt)}
                            className={`flex items-center justify-between px-3 py-2 cursor-pointer text-sm ${i === activeIndex ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <span className="font-medium">{opt.label || opt.id}</span>
                            <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 border border-gray-200">
                                {opt.type}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});
