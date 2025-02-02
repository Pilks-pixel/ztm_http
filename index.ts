import {createServer} from 'node:http';

type Friend = {
	id: number;
	name: string;
};



const server = createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  console.log(req.url.split('/'), req.method, req.url);
  const url = req.url.split('/');

  if (req.method === 'GET' && url.length === 2) {
  res.end(JSON.stringify({data: friends}));
    } else if (req.method === 'GET' && url.length === 3) {
        const id = url[2];
        try {
            res.end(JSON.stringify({data: friends[id]}));
        } catch (error) {
            handle404(res);
            throw new Error(`Not Found - ${error}'`);
            
        }
        // id? console.log(friends[id].name): console.log('no id');
        res.end(JSON.stringify({data: friends[id].name, id}))

    } else {
        console.log(res);
        handle404(res);
    }

});

// function
function handle404(res) {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Not Found'}));
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