**How to Use:**

1. Group the requests you want to save locally into a Postman collection or folder. You can also add the script individually to each request, but this approach is more time-consuming.

2. Paste the following script in the "Scripts" tab of the collection/folder/request you want to save information from:

   ```javascript
   let opts = {
       requestName: request.name || request.url,
       fileExtension: 'txt',
       mode: 'appendFile',
       uniqueIdentifier: true,
       responseData: "Request:\n" + " " + pm.request.body.raw + " " + "\nResponse:\n" + " " + pm.response.text()
   }

   pm.sendRequest({
       url: 'http://localhost:3000/write',
       method: 'POST',
       header: 'Content-Type:application/json',
       body: {
           mode: 'raw',
           raw: opts 
       }
   }, function (err, res) {
       console.log(res);
   });
   ```

3. Run this local server by using the following command in the command prompt: `node script.js`

4. Now, execute the requests/collections in Postman, and they will be saved as TXT files in the "Responses" folder of the cloned repository.
