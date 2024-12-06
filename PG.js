//NAO MEXE NO MENU
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }
  //cabou o menu
  
  // Inicializar os agendamentos do Local Storage
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
  // Atualizar o Local Storage
  function saveToLocalStorage() {
      localStorage.setItem('appointments', JSON.stringify(appointments));
  }
  
  // adicionar um agendamento
  function addAppointment(event) {
      event.preventDefault(); 
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const services = [];
      
      // Verificar os serviços 
      document.querySelectorAll('input[name="services"]:checked').forEach(service => {
          services.push(service.value);
      });
  
      // Verificar se todos os campos foram preenchidos
      if (name === '' || date === '' || time === '' || services.length === 0) {
          alert('Por favor, preencha todos os campos.');
          return;
      }
  
      const appointment = { name, date, time, services };
  
      appointments.push(appointment);
  
      // Salvar no Local Storage
      saveToLocalStorage();
  
      // Limpar formulário após envio
      document.getElementById('appointmentForm').reset();
  
      // Exibir a lista de agendamentos
      displayAppointments();
  }
  
  // Função para excluir
  function deleteAppointment(index) {
      appointments.splice(index, 1);
      saveToLocalStorage();
      displayAppointments();
  }
  
  // Função para editar
  function editAppointment(index) {
      const appointment = appointments[index];
      document.getElementById('name').value = appointment.name;
      document.getElementById('date').value = appointment.date;
      document.getElementById('time').value = appointment.time;
      
      document.querySelectorAll('input[name="services"]').forEach(checkbox => {
          checkbox.checked = appointment.services.includes(checkbox.value);
      });
  
      appointments.splice(index, 1);
      saveToLocalStorage();
      displayAppointments();
  }
  
  // Função para exibir a lista de agendamentos
  function displayAppointments() {
      const appointmentsList = document.getElementById('appointmentsList');
      appointmentsList.innerHTML = '';
  
      if (appointments.length === 0) {
          appointmentsList.innerHTML = '<p>Nenhum agendamento realizado.</p>';
          return;
      }
  
      appointments.forEach((appointment, index) => {
          const services = appointment.services.join(', ');
  
          const appointmentCard = document.createElement('div');
          appointmentCard.classList.add('card', 'mt-3');
          appointmentCard.innerHTML = `
              <div class="card-body">
                  <h5>${appointment.name}</h5>
                  <p><strong>Data:</strong> ${appointment.date}</p>
                  <p><strong>Horário:</strong> ${appointment.time}</p>
                  <p><strong>Serviços:</strong> ${services}</p>
                  <div class="buttons">
                      <button class="btn btn-edit" onclick="editAppointment(${index})">
                          <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-delete" onclick="deleteAppointment(${index})">
                          <i class="bi bi-trash"></i>
                      </button>
                  </div>
              </div>
          `;
          appointmentsList.appendChild(appointmentCard);
      });
  }
  
  // Exibir os agendamentos ao carregar a página
  document.addEventListener('DOMContentLoaded', displayAppointments);
  
  document.getElementById('appointmentForm').addEventListener('submit', addAppointment);
  
  document.querySelectorAll('.servico').forEach((servico) => {
    servico.addEventListener('click', () => {
      servico.classList.toggle("selecionado");
    });
  });
  