
## SCHEMA: goals

Notes: 'order_no' was included to keep track of a specified order, allowing users to customise the order of goals. There was not enough time to implement this in the end. 

Similarly,'last_completed,' is also only there to potentially keep track of how often a user is completing certain goals - but I think more data is required in order for this feature to be meaningful. E.g. all completed dates so that we can have stats.

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

Notes: Numbered columns are meant to keep track of the arrangement and order of lists on a page. 'b' exists so that in the event that the full column is only half-full, you can add another list to 'b' to prevent wide gaping spaces. This is not a finished feature.