import React from 'react';

const Post = () => (
    <article>
        <header>
            <h2 title="Boxing Trainer London">
                <a href="http://olivier.uk/boxing-trainer-london/">
                    Boxing Trainer london
                </a>
            </h2>
            <time datetime="2017-06-05T00:25:31+00:00">
                June 5, 2017
            </time>
            <div>
                <p className="byline tags">
                    <a href="http://olivier.uk/tag/consultation/" rel="tag">Consultation</a>
                    <a href="http://olivier.uk/tag/css3/" rel="tag">CSS3</a>
                    <a href="http://olivier.uk/tag/js/" rel="tag">JS</a><a class="btn btn-primary" href="http://olivier.uk/tag/mobile/" rel="tag">Mobile</a>
                    <a href="http://olivier.uk/tag/visual-composer/" rel="tag">Visual Composer</a><a class="btn btn-primary" href="http://olivier.uk/tag/wordpress/" rel="tag">WordPress</a>
                </p>
            </div>
        </header>
        <div className="post-sidebar">
            <span className="postIntro" role="sectionhead">Selecting and working with a beautiful premium theme for a Personal Trainer</span>
            <nav className="postLink viewSite">
                <a href="http://boxingtrainer.london">View Site</a>
            </nav>  
            <div class="postLink share">
                <h3 role="sectionhead">Share</h3>
                <div class="widget-content">
                </div>
            </div>
        </div>
        <div className="article-content">
            <section>
                <h2>Consultation</h2>
                <p>The client, and experienced and professional personal trainer, was using a <a href="https://en-gb.wordpress.org/themes/twentyfourteen/" target="_blank">stock WordPress theme</a>, having had relationships with a designer working remotely fall through.</p>
                <p>Through our meetings, we developed a set of goals and structure for the site, condensing the number of pages from 9 to 5 to reduce visitor bounce rates.</p>
                <p>I also helped the client select a modern domain, <a href="http://boxing trainer.london" target="_blank">boxingtrainer.london</a> instead of boxingtrainerlondon.com, and setup new hosting and email as an extension to the original project.</p>
                <p>Thought the project I was happy to help select and optimise the clients photos, as well as assisting with producing copy and curating the content.</p>
            </section>
            <section>
                <h2>Development</h2>
                <p>Once we had clear branding goals, I then found a premium theme to base the site on. This allowed us to achieve a richly featured site with minimal development costs. </p>
                <p>The theme uses <a href="https://vc.wpbakery.com" target="_blank">Visual Composer</a>, a powerful drag-and-drop layout system. This was important since the client wanted to ability to easily customise the content without my assistance, and I was able to save many of the layouts I built as templates for the client to re-use later. </p>
                <p>Unfortunately, software like Visual Composer ends up forcing a designer to choose whether to optimise for desktop or mobile, since the built in options only go so far. Once the core layout and content was established, and optimised for desktop devices, I then augmented the theme with custom CSS and JS- this allowed us to refine the site experience across screen sizes.</p>
            </section>
        </div>
    </article>
)
