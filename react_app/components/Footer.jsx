import React from 'react';

const Footer = () => (

    <footer role="complementary" title="About Olivier, enquiry form, and various links">
        <div class="homeLink">
            <a href="/" title="Home" class="closePost">
                <img src="/react_app_built/images/icon-house.png" alt="Home" />
            </a>
        </div>
        <div class="content">
                {WORDPRESS.author.content}
            <div class="sidebar-wrapper" role="group" title="Sharing links, other places to visit.">
                {WORDPRESS.category[0].name}
            </div>
        </div>
    </footer>
    
);

export default Footer