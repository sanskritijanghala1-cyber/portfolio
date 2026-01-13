function openFolder(element) {
    // 1. Find all folders
    const folders = document.querySelectorAll('.folder');
    
    // 2. Remove 'active' class from everyone
    folders.forEach(folder => {
        folder.classList.remove('active');
    });

    // 3. Add 'active' class to the one we clicked
    element.classList.add('active');
}