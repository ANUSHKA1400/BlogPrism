// Simple test script to verify API connectivity
fetch('http://localhost:5000/api/posts')
  .then(response => response.json())
  .then(data => {
    console.log('Success! Received data from API:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });