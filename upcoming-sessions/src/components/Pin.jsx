import React from 'react';

const Pin = ({ color = '#ef4444', className = '' }) => {
    return (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-md ${className}`}>
            {/* Pin Head */}
            <div
                className="w-4 h-4 rounded-full relative z-10"
                style={{
                    backgroundColor: color,
                    background: `radial-gradient(circle at 30% 30%, ${color}aa, ${color})`,
                    boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.5)'
                }}
            />
            {/* Pin Needle (mostly hidden, just the metallic part visible) */}
            <div className="w-1 h-3 bg-gray-400 mx-auto -mt-1 rounded-b-sm" />
        </div>
    );
};

export default Pin;
