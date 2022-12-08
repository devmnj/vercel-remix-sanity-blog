import  SyntaxHighlighter  from 'react-syntax-highlighter';

export default function Code(props ){
    return (
       <>
    
    <SyntaxHighlighter language="javascript"  >
        {props.children}
        </SyntaxHighlighter>
       </>
    )
}