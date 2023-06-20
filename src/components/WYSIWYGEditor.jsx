import { useEffect } from "react";
import { useQuill } from "react-quilljs";

const WYSIWYGEditor = ({ setValue, name, contentState }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      if (contentState) {
        try {
          var jsonObj = JSON.parse(contentState);
        } catch (e) {
          console.error("JSON Parse error while reading html content", name);
          jsonObj = { html: contentState };
        }
        //console.log(jsonObj.html)
        const html = jsonObj.html;
        quill.root.innerHTML = html;
      }

      quill.on("text-change", (delta, oldDelta, source) => {
        //console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        //  console.log(quill.getContents()); // Get delta contents
        var html = quill.root.innerHTML;
        //  console.log("HTML=======>", html); // Get innerHTML using quill
        var htmlObj = { html };
        setValue(name, JSON.stringify(htmlObj));
        //  console.log("JSON OUTPUT::::::",JSON.stringify(htmlObj))
        //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill, quillRef]);

  return (
    <div style={{ maxHeight: "350px", overflow: "scroll" }}>
      <div style={{ width: 500, height: 250 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default WYSIWYGEditor;
