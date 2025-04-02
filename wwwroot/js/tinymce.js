window.initTinyMCE = (editorId, apiKey) => {
    tinymce.init({
        selector: `#${editorId}`, // Správná selekce podle ID
        language: 'cs',
        apiKey: apiKey, // Použití API klíče
        menubar: false,
        plugins: "lists link image",
        toolbar: "undo redo | bold italic | bullist numlist | link image"
    });
};