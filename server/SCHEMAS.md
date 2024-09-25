

## SCHEMA: goals

### Simple List Goals

TABLE goals.simple (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    list VARCHAR(30),
    tab VARCHAR(30),
    color VARCHAR(15),
    order_no INT,
    active DEFAULT BOOLEAN TRUE,
    complete DEFAULT BOOLEAN FALSE,
    last_completed DATE,
    type VARCHAR(15)
)

TABLE goals.progbars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    list VARCHAR(30),
    tab VARCHAR(30),
    color VARCHAR(15),
    order_no INT,
    active DEFAULT BOOLEAN TRUE,
    complete DEFAULT BOOLEAN FALSE,
    last_completed DATE,
    current INT,
    goal_number INT,
    units VARCHAR(20),
    type VARCHAR(15)
)

TABLE goals.levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    list VARCHAR(30),
    tab VARCHAR(30),
    color VARCHAR(15),
    order_no INT,
    active DEFAULT BOOLEAN TRUE,
    complete DEFAULT BOOLEAN FALSE,
    last_completed DATE,
    type VARCHAR(15),
    level INT
)

TABLE goals.sets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    list VARCHAR(30),
    tab VARCHAR(30),
    color VARCHAR(15),
    order_no INT,
    active DEFAULT BOOLEAN TRUE,
    complete DEFAULT BOOLEAN FALSE,
    last_completed DATE,
    type VARCHAR(15),
    sets INT,
    reps INT,
    completed_sets INT
)