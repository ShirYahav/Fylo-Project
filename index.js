
const fileInput = document.getElementById('fileInput');
const fileSizeDisplay = document.getElementById('fileSizeDisplay');
const MBLeftElement = document.getElementById('MBLeft');


function moveBar(size) {
    const element = document.getElementById("gradient-bar-id");
    let currentWidth = parseFloat(element.style.width) || 3;
    const targetWidth = size * 10;
    const step = (targetWidth - currentWidth) / 100;

    let id = setInterval(frame, 5);
    function frame() {
        currentWidth+= step;
        element.style.width = currentWidth + "%";
        if(currentWidth >= targetWidth) {
            clearInterval(id);
        }
    }  
}

const getTotalFileSize = () => parseFloat(localStorage.getItem('totalFileSize')) || 0;

function updateTotalFileSize(newSize, MBLeft) {
    localStorage.setItem('totalFileSize', newSize);
    localStorage.setItem('MBLeft', MBLeft);
}

function updateProgressBar(totalSize, previousSize) {
    moveBar(totalSize, previousSize);
    fileSizeDisplay.textContent = totalSize === 0 ? totalSize.toFixed(0) : totalSize.toFixed(2);
    MBLeftElement.firstChild.textContent = (10 - totalSize).toFixed(2);
}


document.getElementById('upload-file').addEventListener('click', function(){
    fileInput.click();
});


fileInput.addEventListener('change', function(event) {
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





