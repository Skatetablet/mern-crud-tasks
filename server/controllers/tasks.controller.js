import pool from '../db.js'

export const getTasks = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM task ORDER BY createdAt ASC");
        res.json(result);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getTask = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [req.params.id]);
        console.log(result);
        if ( result.length === 0) {
            return res.status(404).json({message: "Task not found"});
        }
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createTask = async (req, res) => {
    try {
        const {title, description} = req.body
        const [result] = await pool.query("INSERT INTO task(title, description) VALUES (?, ?)",
        [
            title, 
            description
        ]);

        res.json({
            id: result.insertId,
            title, 
            description,
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateTasks = async(req, res) => {
    try {
        const result = await pool.query("UPDATE task SET ? WHERE id = ?", [req.body, req.params.id])
        res.json(result) 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteTask = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM task where id = ?", [req.params.id])
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Task not found"});
        } 
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}