document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('tbody')

  // Obtener los elementos de los botones y modales
  const addNew = document.getElementById('openModalBtn')
  const closeM = document.getElementById('closeModalBtn')
  const closeE = document.getElementById('closeeditModalBtn')

  addNew.onclick = function () {
    document.getElementById('userModal').style.display = 'block'
  }

  closeM.onclick = function () {
    document.getElementById('userModal').style.display = 'none'
  }

  closeE.onclick = function () {
    document.getElementById('editModal').style.display = 'none'
  }

  async function fetchUsers () {
    try {
      const response = await fetch('/usuarios') // Ruta configurada en el servidor
      if (!response.ok) throw new Error('Network response was not ok')
      const users = await response.json()
      displayUsers(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  function displayUsers (users) {
    tableBody.innerHTML = ''

    users.forEach(user => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
              <td>${user.ID}</td>
              <td>${user.Name}</td>
              <td>${user.Email}</td>
              <td>${user.Role}</td>
              <td><img src="${user.Profile_picture}" alt="Profile Picture" class="profile-pic"></td>
              <td>
                  <button class="edit-btn" data-id="${user.ID}">Edit</button>
                  <button class="delete-btn" data-id="${user.ID}">Delete</button>
              </td>
          `
      tableBody.appendChild(tr)
    })

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', handleEdit)
    })
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', handleDelete)
    })
  }

  function handleEdit (event) {
    const userId = event.target.dataset.id

    console.log('Edit user:', userId)

    document.getElementById('editModal').style.display = 'block'
  }

  function handleDelete (event) {
    const userId = event.target.dataset.id
    // Lógica para eliminar el usuario
    console.log('Delete user:', userId)
  }

  fetchUsers()
})
