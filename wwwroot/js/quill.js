console.log("quill.js načten!");

window.initQuill = (editorId) => {
    console.log(`🖋️ Hledám element: #${editorId}`);
    var editorElement = document.getElementById(editorId);

    if (!editorElement) {
        console.error(`❌ Element s ID '${editorId}' nebyl nalezen!`);
        return;
    }

    console.log(`✅ Element '${editorId}' nalezen, inicializuji Quill...`);

    //var quill = new Quill(`#${editorId}`, {
    //    theme: 'snow',
    //    modules: {
    //        toolbar: '#toolbar'
    //    }
    //});
    const quill = new Quill(`#${editorId}`, {
        modules: {
            toolbar: '#toolbar'
        },
        theme: 'snow'
    });

    window.quillInstances = window.quillInstances || {};
    window.quillInstances[editorId] = quill;
    return quill; // 🔥 Blazor potřebuje návratovou hodnotu

    console.log(`✅ Quill úspěšně vytvořen.`);
};

window.setQuillContent = (editorId, content) => {
    var quill = window.quillInstances[editorId];
    if (quill) {
        quill.root.innerHTML = content;
    }
};

window.bindQuillChange = (editorId, dotNetHelper) => {
    var quill = window.quillInstances[editorId];
    quill.on('text-change', function () {
        var content = quill.root.innerHTML;
        dotNetHelper.invokeMethodAsync('OnQuillContentChanged', content);
    });
};