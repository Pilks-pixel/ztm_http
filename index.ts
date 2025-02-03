import { createServer } from "node:http";

type Friend = {
  id: number;
  name: string;
};

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  console.log(req.url.split("/"), req.method, req.url);
  const url = req.url.split("/");

  if (req.method === "GET" && url[1] === "friends") {
    if (url.length === 3) {
      const id = url[2];
      if (friends[id]) {
        getFriend(res, id);
      } else {
        handle404(res);
      }
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ data: friends }));
    }
  } else if (req.method === "POST" && url[1] === "friends") {
    req.on("data", data => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else {
    handle404(res);
  }
});

// Functions
function handle404(res) {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
}

function getFriend(res, id) {
  res.statusCode = 200;
  res.end(JSON.stringify({ data: friends[id] }));
}

// Type definition
const friends: Friend[] = [
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
  console.log("Server is running on http://localhost:8000");
});
