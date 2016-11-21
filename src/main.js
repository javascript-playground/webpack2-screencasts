import './style.css'

const username = 'jackfranklin'
fetch(`https://api.github.com/users/${username}`)
  .then(d => d.json())
  .then(d => {
    document.getElementById('result').innerHTML = `
      <div>
        <h2>${d.login}</h2>
        <h5>${d.company}</h5>
        <p>${d.bio || 'No Bio :('}</p>
    `
  })
