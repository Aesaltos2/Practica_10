import { pool } from './config/db.js'

export const getAll = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM users_p10')
    res.json(result)
  } catch (error) {
    console.error('Error retrieving users:', error)
    res.status(500).json({ message: 'Error retrieving users' })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params

  const [result] = await pool.execute('DELETE FROM users_p10 WHERE ID = ?', [id])

  if (result.affectedRows === 1) {
    return res.json({ message: 'Usuario eliminado' })
  }

  return res.status(500).json({ message: 'No se pudo eliminar el usuario' })
}

export const createUser = async (req, res) => {
  const { Name, Email, Role, Profile_picture } = req.body

  if (!Name || !Email || !Role || !Profile_picture) { return res.status(400).json({ message: 'Faltan datos en el formulario' }) }

  const [result] = await pool.execute(
    'INSERT INTO users_p10(Name, Email, Role, Profile_picture) VALUES (?,?,?,?)', [Name, Email, Role, Profile_picture]
  )

  if (result.affectedRows !== 1 && !result.insertId) {
    return res.status(500).json({ message: 'Hubo un error al crear el Usuario' })
  }

  res.status(201).json({ message: 'Usuario guardado' })
}

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params
    const { Name, Email, Role, Profile_picture } = req.body

    if (!Name || !Email || !Role || !Profile_picture) { return res.status(400).json({ message: 'Faltan datos en el formulario' }) }

    const [result] = await pool.execute(
      'UPDATE users_p10 SET Name=?, Email=?, Role=?, Profile_picture=? WHERE ID=?', [Name, Email, Role, Profile_picture, id]
    )

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: 'Hubo un error al actualizar el Usuario' })
    }

    res.status(201).json({ message: 'Usuario actualizado' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno', details: error.message })
  }
}
