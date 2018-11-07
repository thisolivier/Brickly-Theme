import React from 'react';
import Outlinks from './OutLinks';

class Post extends React.Component {
    render() {
        var post = WORDPRESS.posts[this.props.postId]
        var elements = post.content.split('</section>').map((item,index)=>{
            console.log('item is', item)
            var sectionText = item.replace('<section>','').replace(/(\r\n\t|\n|\r\t)/gm,"")
            var unsafeTitle = sectionText.match(/<h2>(.*?)<\/h2>/g)
            if (!unsafeTitle){
                return null
            }
            var safeTitle = unsafeTitle[0].replace("<h2>","").replace("</h2>","")
            console.log("title is", safeTitle)
            return {
                title: safeTitle,
                content: sectionText.replace(unsafeTitle[0],'').split('</p>').map((paragraph, paragraphIndex)=>{
                    var paragraphString = paragraph.replace('<p>','')
                    return paragraphString.split(/<a\s|<\/a>/g)
                })
            }
        })
            
            
        
        console.log(elements)
        return (
            <div className="post">
                <h2>{post.title}</h2>
                <section className="info">
                    <p>{post.date}</p>
                    <p>{post.byLine}</p>
                    <ul className="tags">
                        {post.tags.map((tag, index)=><li key={index}>{tag}</li>)}
                    </ul>
                </section>
                <section>{post.content}</section>
                <section className="outLinks">
                    <li>{post.repo}</li>
                    <li>{post.liveSite}</li>
                    <Outlinks />
                </section>
                <img className="backgroundImage" src={post.image} />
            </div>
        )
    }
}

export default Post