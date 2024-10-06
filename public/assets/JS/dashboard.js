let btn=document.querySelector('#btn')
    let sidebar=document.querySelector('.sidebar')

    btn.onclick=function()
    {
        sidebar.classList.toggle('active')
    };


const url = "./musicApi.json";
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => 
    {
        const minP=0,maxP=43;
        for(let i=0;i<43;i++)
        {
            flag=Math.floor(Math.random() * (maxP - minP) + minP);
            document.getElementsByClassName('discover_image')[i].src = data.songs[flag].photo;
            document.getElementsByClassName('Dmatter')[i].innerHTML=data.songs[flag].song;
            document.getElementsByClassName('genre')[i].textContent=data.songs[flag].genre+'||'+data.songs[flag].artist+'||'+data.songs[flag].movie;
        }
    })
    .catch(error => console.error('Error fetching data:', error));

function fun(n) {
    const matters = document.querySelectorAll('.Dmatter');
    const songTitle = matters[n].innerText;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const songData = data.songs.find(song => song.song === songTitle);

            if (songData) 
            {
                document.getElementById('audio').src = songData.songsrc;
                document.getElementById('get_image').src=songData.photo;
                document.getElementById('right_h4').textContent=songData.song;
                document.getElementById('right_p').textContent=songData.genre+'||'+songData.artist+'||'+songData.movie;
                document.getElementById('get_image').style.display='block'; 
                document.getElementById('right_names').style.display='block'; 
                document.getElementById('audio').play();
                
            } else {
                console.error('Song not found!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
