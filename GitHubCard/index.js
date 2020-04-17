/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

cardList = document.querySelector(`.cards`);

// const followersArray = [`insomniac34`, `tetondan`, `dustinmyers`, `justsml`, `luishrd`, `bigknell`];
// followersArray.forEach(user => {
//   axios.get(`https://api.github.com/users/${user}`)
//     .then(response => {
//       cardList.appendChild(cardCreator(response));
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function cardCreator(response){
  const cardDiv = document.createElement(`div`);
  cardDiv.classList.add(`card`);

    const userImg = document.createElement(`img`);
    userImg.src = response.data.avatar_url;
    cardDiv.appendChild(userImg);

    const cardInfoDiv = document.createElement(`div`);
    cardInfoDiv.classList.add(`card-info`);
    cardDiv.appendChild(cardInfoDiv);

      const nameHeading = document.createElement(`h3`);
      nameHeading.classList.add(`name`);
      nameHeading.textContent = response.data.name;
      cardInfoDiv.appendChild(nameHeading);

      const username = document.createElement(`p`);
      username.classList.add(`username`);
      username.textContent = response.data.login;
      cardInfoDiv.appendChild(username);

      const userLocation = document.createElement(`p`);
      userLocation.textContent = response.data.location;
      cardInfoDiv.appendChild(userLocation);

      const profile = document.createElement(`p`);
      profile.textContent = `Profile: `; //is there a way to have the anchor tag here instead of appended below?
      cardInfoDiv.appendChild(profile);

        const userUrl = document.createElement(`a`);
        userUrl.href = response.data.url;
        userUrl.textContent = response.data.url;
        profile.appendChild(userUrl);

      const followers = document.createElement(`p`);
      followers.textContent = `Followers: ${response.data.followers}`;
      cardInfoDiv.appendChild(followers);

      const following = document.createElement(`p`);
      following.textContent = `Following: ${response.data.following}`;
      cardInfoDiv.appendChild(following);

      const bio = document.createElement(`p`);
      bio.textContent = `Bio: ${response.data.bio}`;
      cardInfoDiv.appendChild(bio);

  return cardDiv;
}

function addFollowing(followingLink){
  axios.get(followingLink)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
};

axios.get(`https://api.github.com/users/keenanhallas`)
  .then(response => {
    console.log(response);
    cardList.appendChild(cardCreator(response)); //does it make sense to bind the card to a variable as well?
    return response.data.following_url;
  })
  .then(followingLink => {
    addFollowing(followingLink);
  })
  .catch(err => {
    console.log(err);
  });