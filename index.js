
const fileInput = document.getElementById('fileInput');
const fileSizeDisplay = document.getElementById('fileSizeDisplay');
const MBLeftElement = document.getElementById('MBLeft');

//Progress Bar
function moveBar(size) {
    const element = document.getElementById("gradient-bar-id");
    let currentWidth = parseFloat(element.style.width) || 3;
    let targetWidth = size * 10;
    let step = (targetWidth - currentWidth) / 100;

    let id = setInterval(frame, 5);
    function frame() {
        currentWidth+= step;
        element.style.width = currentWidth + "%";
        if(currentWidth >= targetWidth) {
            clearInterval(id);
        }
    }  
}

//Get total size from local storage
function getTotalFileSize() {
    //gets size from local storage
    //parseFloat is used to convert strings into floating-point numbers
    return parseFloat(localStorage.getItem('totalFileSize')) || 0;
}
//const getTotalFileSize = () => parseFloat(localStorage.getItem('totalFileSize')) || 0;

//Update total size in local storage
function updateTotalFileSize(newSize, MBLeft) {
    localStorage.setItem('totalFileSize', newSize);
    localStorage.setItem('MBLeft', MBLeft);
}

//Update progress bar based on total file size
function updateProgressBar(totalSize, previousSize) {
    moveBar(totalSize, previousSize);
    fileSizeDisplay.textContent = totalSize === 0 ? totalSize.toFixed(0) : totalSize.toFixed(2);
    MBLeftElement.firstChild.textContent = (10 - totalSize).toFixed(2);
}


//Added event listener to my button
document.getElementById('upload-file').addEventListener('click', function(){
    //stimulating a user clicking the button, when the click event of the file input is triggered, it opens the file explorer
    fileInput.click();
});


//this row listens for a 'change' which occurs when a user selects a file using the file explorer
fileInput.addEventListener('change', function(event) {
    //event.target.files contains an array-like object that contains the file
    const selectedFile = event.target.files[0];

    if(!selectedFile) {
        fileSizeDisplay.textContent = ''; 
        return;
    }

    const fileSize = (selectedFile.size / (1024 * 1024));
    let totalSize = getTotalFileSize();
    if(totalSize + fileSize > 10) {
        alert ("There is not enough space on the disk");
        return;
    }

    totalSize += fileSize;
    fileSizeDisplay.textContent = `${totalSize.toFixed(2)} MB`;
    
    updateProgressBar(totalSize);
    updateTotalFileSize(totalSize, MBLeft);
    moveBar(totalSize);

});

updateProgressBar(getTotalFileSize());





