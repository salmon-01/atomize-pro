'use strict';

const client = require('./db.js');

// CREATION: Goals, Lists, and Tabs

const saveGoals = async (req, res) => {
    const { name, list, tab, color, order_no, active, complete, last_completed, type } = req.body;

    try {
        if (!name || !list || !tab || !color || !type ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        let tableName;
        let goalFields = [];
        let goalValues = [];
        let placeholders = [];
    
        if (type === 'Simple List') {
    
            tableName = 'goals.simple';
            goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type'];
            goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type];
    
        } else if (type === 'Progress Bar') {
            tableName = 'goals.progbars';
    
            const { current, goal_number, units } = req.body;
            goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'current', 'goal_number', 'units'];
            goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, current, goal_number, units];

        } else if (type === 'Levels') {
            tableName = 'goals.levels';

            const { level } = req.body;
            goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'level'];
            goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, level];

        } else if (type === 'Sets') {
            tableName = 'goals.sets';

            const { sets, reps, completed_sets } = req.body;
            goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'sets', 'reps', 'completed_sets'];
            goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, sets, reps, completed_sets];
        }
    
        goalValues = goalValues.filter(val => val !== undefined);
        placeholders = goalValues.map((_, index) => `$${index + 1}`);
        const insertGoalQuery = `
            INSERT INTO ${tableName} (${goalFields.join(', ')})
            VALUES (${placeholders.join(', ')})
            RETURNING *;
        `;
        const doesGoalExist = `SELECT * FROM ${tableName} WHERE name = $1`;
            const result = await client.query(doesGoalExist, [name]);
    
            if (result.rows.length > 0) {
                return res.status(400).json({ message: 'Goal with this name already exists' });
            }
        const newGoal = await client.query(insertGoalQuery, goalValues);
        res.status(201).json(newGoal.rows[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error when saving goal' });
    }
}

const saveTab = async (req, res) => {
    const { name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no } = req.body;
    if (!name || !icon ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const checkIfExistsQuery = `
        SELECT * FROM userinfo.tabs WHERE name = $1 OR icon = $2`;
        const existingTabResult = await client.query(checkIfExistsQuery, [name, icon]);
        if (existingTabResult.rows.length > 0) {
            if (existingTabResult.rows[0].name === name) {
                return res.status(400).json({ message: 'Tab with this name already exists' });
            }
            if (existingTabResult.rows[0].icon === icon) {
                return res.status(400).json({ message: 'Tab with this icon already exists' });
            }
        }
        const insertTabQuery = `
            INSERT INTO userinfo.tabs (name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const newTab = await client.query(insertTabQuery, [
            name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no
        ]);
        if (!newTab.rows.length) {
            return res.status(500).json({ message: 'Failed to insert the new tab' });
        }
        res.status(201).json(newTab.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error when saving tab' });
    }
}

// FETCHING STORED DATA

const getAllTabs = async (req, res) => {
    try {
        const getTabsQuery = 'SELECT * FROM userinfo.tabs';
        const result = await client.query(getTabsQuery);
        if (result.rows.length === 0) {
            return res.status(200).json([]); 
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tabs:', error);
        res.status(500).json({ message: 'Server error when fetching tabs' });
    }
};

const getAllGoals = async (req, res) => {
    try {
        // Step 1: Get the list of all tables in the goals schema
        const tablesQuery = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'goals' 
            AND table_type = 'BASE TABLE';
        `;
        const tablesResult = await client.query(tablesQuery);

        if (tablesResult.rows.length === 0) {
            return res.status(200).json([]); 
        }

        // Step 2: Initialize an object to hold all data
        const allData = {};

        // Step 3: Loop through each table name and fetch data
        for (const row of tablesResult.rows) {
            const tableName = row.table_name;
            const dataQuery = `SELECT * FROM goals.${tableName};`;
            const dataResult = await client.query(dataQuery);
            allData[tableName] = dataResult.rows; // Store the data using the table name as the key
        }

        console.log(allData)

        // Step 4: Send the collected data as the response
        res.status(200).json(allData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error when fetching data from goals schema' });
    }
};



// EDIT DATA

const updateGoalStatus = async (req, res) => {
    const { name, type, newValue } = req.body;
    let tableName;
    let col;
    let condition;
    let completeUpdate = ''; // Initialize empty complete update

    // Determine the table and column based on the goal type
    if (type === 'Simple List') {
        tableName = 'goals.simple';
        col = 'complete'; 
    } else if (type === 'Progress Bar') {
        tableName = 'goals.progbars';
        col = 'current';
        condition = 'current >= goal_number';
        completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`;
    } else if (type === 'Sets') {
        tableName = 'goals.sets';
        col = 'completed_sets';
        condition = 'completed_sets = sets';
        completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`; 
    } else if (type === 'Levels') {
        tableName = 'goals.levels';
        col = 'level';
        condition = 'level = 3';
        completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`;  // Conditional update for 'complete'
    } else {
        return res.status(400).json({ message: 'Invalid goal type' });
    }

    const query = `
        UPDATE ${tableName}
        SET ${col} = $1
        ${completeUpdate}  -- Only include this if it's not a 'Simple List'
        WHERE name = $2 RETURNING *`;

    try {
        const result = await client.query(query, [newValue, name]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal updated successfully', updatedGoal: result.rows[0] });
    } catch (error) {
        console.error('Error updating goal status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const insertListPos = async (req, res) => {
    const { tabName, listName, col } = req.body;
    const validColumns = ['col_one', 'col_one_b', 'col_two', 'col_two_b', 'col_three', 'col_three_b'];
    if (!validColumns.includes(col)) {
        return res.status(400).json({ message: 'Invalid column name' });
    }
    const query = `UPDATE userinfo.tabs SET ${col} = $1 WHERE name = $2 RETURNING *`;
    try {
        const result = await client.query(query, [listName, tabName]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Tab not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating tab:', error);
        res.status(500).json({ message: 'Server error while updating the tab' });
    }
}

// DELETE DATA

const deleteGoal = async (req, res) => {
    const { goalName, type } = req.body;
    let tableName;
    if (type === 'Simple List') {
        tableName = 'goals.simple';
    } else if (type === 'Progress Bar') {
        tableName = 'goals.progbars';
    } else if (type === 'Sets') {
        tableName = 'goals.sets';
    } else if (type === 'Levels') {
        tableName = 'goals.levels';
    } 
    try {
      const deleteQuery = `DELETE FROM ${tableName} WHERE name = $1 RETURNING *;`;
      const result = await client.query(deleteQuery, [goalName]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.status(200).json({ message: 'Goal deleted successfully', goal: result.rows[0] });
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).json({ message: 'Server error when deleting goal' });
    }
  };
  // Update to include more than goals.simple later;

const deleteTab = async (req, res) => {
    const { tabName } = req.params; // Must pass tab name
    try {
      const deleteQuery = 'DELETE FROM userinfo.tabs WHERE name = $1 RETURNING *;';
      const result = await client.query(deleteQuery, [tabName]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Tab not found' });
      }
      res.status(200).json({ message: 'Tab deleted successfully', tab: result.rows[0] });
    } catch (error) {
      console.error('Error deleting tab:', error);
      res.status(500).json({ message: 'Server error when deleting tab' });
    }
  };

  const deleteListPos = async (req, res) => {
    const { tabName, listName } = req.params;
    try {
        // Find the tab by name
        const selectQuery = `
            SELECT col_one, col_two, col_three
            FROM userinfo.tabs
            WHERE name = $1;
        `;
        const tabResult = await client.query(selectQuery, [tabName]);

        if (tabResult.rowCount === 0) {
            return res.status(404).json({ message: 'Tab not found' });
        }

        const { col_one, col_two, col_three } = tabResult.rows[0];

        let updateQuery = '';
        const queryValues = [tabName];

        if (col_one === listName) {
            updateQuery = 'UPDATE userinfo.tabs SET col_one = NULL WHERE name = $1';
        } else if (col_two === listName) {
            updateQuery = 'UPDATE userinfo.tabs SET col_two = NULL WHERE name = $1';
        } else if (col_three === listName) {
            updateQuery = 'UPDATE userinfo.tabs SET col_three = NULL WHERE name = $1';
        } else {
            return res.status(404).json({ message: 'List not found in any column' });
        }

        // Execute the update query
        const updateResult = await client.query(updateQuery, queryValues);

        // If the update was successful
        res.status(200).json({ message: `List ${listName} deleted successfully from tab ${tabName}` });
    } catch (error) {
        console.error('Error deleting list from tab:', error);
        res.status(500).json({ message: 'Server error when deleting list' });
    }
};


// Still needed: resetGoals, editGoals, editTabs, editLists, deleteLists


module.exports = { saveGoals, saveTab, getAllTabs, getAllGoals, insertListPos, deleteListPos, deleteGoal, deleteTab, updateGoalStatus};