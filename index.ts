import {createServer} from 'node:http';

type Friend = {
	id: number;
	name: string;
};



const server = createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  console.log(req.url.split('/'), req.method, req.url);
  const url = req.url.split('/');

  if (req.method === 'GET') {
     
    if(url.length === 3) {
        const id = url[2];
        if(friends[id]) {
            getFriend(res, id);
        } else {
            handle404(res);
        }
        
    } else {
        res.end(JSON.stringify({data: friends}));
    }

    } else {
        handle404(res);
    }

});

// Functions
function handle404(res) {
    res.statusCode = 404;
    res.end(JSON.stringify({message: 'Not Found'}));
}

function getFriend(res, id) {
    res.end(JSON.stringify({data: friends[id]}));
}

// Type definition
const friends :Friend[] = [
	{
		id: 0,
		name: "Nikola Tesla",
	},
	{
		id: 1,
		name: "Sir Isaac Newton",
	},
	{
		id: 2,
		name: "Albert Einstein",
	},
];


server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});