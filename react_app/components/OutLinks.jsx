import React from 'react';

const OutLinks = () => (
    <div className="outlinks">
        {WORDPRESS.outlinks.map((link, index) => 
            <a href={link.destination} key={index} id={link.title}>{link.title}</a>
        )}
    </div>
);

export default OutLinks