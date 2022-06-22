console.log("Welcome To Spotify");
let songIndex=1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressbar=document.getElementById('myProgressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Pasoori", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Chandra", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Halamithi Habibo", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Shivaba Raj", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName:"SubanAllah", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName:"Barbaadiyan", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName:"Manohari", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"}
]

const playNextSong = ()=>{
    console.log("songIndex: ", songIndex);
    if(songIndex>=7){
        songIndex = 1;
    } else{
        songIndex += 1;
    }
    makeAllPlays();
    const element = document.getElementById(songIndex);
    element.classList.remove('fa-circle-play');
    element.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex}.mp3`;
    console.log(`songs/${songIndex}.mp3`);
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

}

  songItem.forEach((element,i)=>{
      
       element.getElementsByTagName("img")[0].src =songs[i].coverPath;
       element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
  })
 // audioElement.play()
//play music
 masterPlay.addEventListener('click' ,()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
          audioElement.play();
          masterPlay.classList.remove('fa-circle-play');
          masterPlay.classList.add('fa-circle-pause');
          gif.style.opacity=1;
     }
     else{
         audioElement.pause();
         masterPlay.classList.remove('fa-circle-pause');
         masterPlay.classList.add('fa-circle-play');
         gif.style.opacity=0;
     }
 })

//listen to event
 audioElement.addEventListener('timeupdate',()=>{
    
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)* 100);
     
    myProgressbar.value=progress;
    if(progress === 100){
        console.log("Progress: ", progress);
        playNextSong();
    }
 })

 myProgressbar.addEventListener('change', ()=>{
     audioElement.currentTime=myProgressbar.value*audioElement.duration/100;
     
 })

 const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');


        
    })
})
document.getElementById('next').addEventListener('click', playNextSong);

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 7;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

