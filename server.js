const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 5001;
const lol_router = require('./routes/lolRouter');
const lol_gQL_baseStats = require('./graphql/lol/baseStats');
const lol_gQL_combatStats = require('./graphql/lol/combatStats');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use('/lol', lol_router);
app.use('/graphql/lol/combatStats', lol_gQL_combatStats);
app.use('/graphql/lol/baseStats', lol_gQL_baseStats);
app.use(morgan('tiny'));
app.use(express.static('./client/public'));
app.listen(PORT, () => {
    console.log(`server started and listening to port ${PORT}`);
});
