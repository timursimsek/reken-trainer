import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Reken-Trainer",
  });
});

app.post("/start", (req, res) => {
  const tafels = Array.isArray(req.body.tafels)
    ? req.body.tafels.map(Number)
    : [Number(req.body.tafels)];

  const bewerkingen = Array.isArray(req.body.bewerkingen)
    ? req.body.bewerkingen
    : [req.body.bewerkingen];

  const aantal = Number(req.body.aantal);
  const oefeningen: { vraag: string; antwoord: number }[] = [];

  for (let i = 0; i < aantal; i++) {
    const tafel = tafels[Math.floor(Math.random() * tafels.length)];
    const getal = Math.floor(Math.random() * 10) + 1;
    const operatie =
      bewerkingen[Math.floor(Math.random() * bewerkingen.length)];

    if (operatie === "maal") {
      oefeningen.push({
        vraag: `${tafel} × ${getal}`,
        antwoord: tafel * getal,
      });
    }

    if (operatie === "delen") {
      const product = tafel * getal;
      oefeningen.push({
        vraag: `${product} ÷ ${tafel}`,
        antwoord: getal,
      });
    }
  }

  res.render("oefeningen", { tafels, bewerkingen, oefeningen });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
