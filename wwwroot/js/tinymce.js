console.log("tinymce.js načten!");

/*window.initTinyMCE = function (editorId, apiKey) {
    tinymce.init({
        selector: `#${editorId}`, // Správná selekce podle ID
        language: 'cs',
        //apiKey: apiKey, // Použití API klíče
        menubar: false,
        plugins: "lists link image",
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent',
        setup: function (editor) {
            editor.on('change', function () {
                // Zavoláme Blazor metodu, která zpracuje změny
                let content = editor.getContent();
                DotNet.invokeMethodAsync('blazorfirestore', 'OnEditorContentChanged', content);
            });
        }
    });
};

window.getTinyMCEContent = function (editorId) {
    var content = tinymce.get(editorId).getContent();
    return content;
};
*/
window.config = {
    height: 300,
    editor_selector: "tinymceEditor",
    language: 'cs',
    plugins: 'wordcount',
    toolbar: 'undo redo | bold italic | wordcount',
    promotion: false,
    //statusbar: false,
    //skin: 'oxide-dark',
    //content_css: 'dark'
    skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
    content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
};