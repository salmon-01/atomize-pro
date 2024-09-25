

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

### Progress Bars

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

### Levels

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

### Sets

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

## SCHEMA: userinfo

### tabs

TABLE userinfo.tabs (
    name VARCHAR(30),
    icon VARCHAR(80),
    col_one VARCHAR(30),
    col_one_b VARCHAR(30),
    col_two VARCHAR(30),
    col_two_b VARCHAR(30),
    col_three VARCHAR(30),
    col_three_b VARCHAR(30),
    order_no INT
)