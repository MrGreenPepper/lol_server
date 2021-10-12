// Wait for the page to load first

window.onload = function () {
    //Get a reference to the link on the page
    // with an id of "mylink"
    var link_baseData = document.getElementById('link_baseData');
    var link_duell = document.getElementById('link_duell');

    //Set code to run when the link is clicked
    // by assigning a function to "onclick"
    link_baseData.onclick = async function () {
        const baseData = await axios.get('/baseData.html');
        console.log(baseData);
        var mainFrame = document.querySelector('.mainFrame');
        $('.mainFrame').html(baseData.data);
        return false;
    };
    link_duell.onclick = async function () {
        const duellData = await axios.get('/duell.html');
        console.log(duellData.data);
        var mainFrame = document.querySelector('.mainFrame');
        $('.mainFrame').html(duellData.data);
        return false;
    };
};
