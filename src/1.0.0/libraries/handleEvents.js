
const successMessage = (action,data) =>({
  variant:'success',
  title: `Éxito ${action}`,
  message:`Su operación ha sido completada`,
  data 
})

const failMessage = (action,data)=>({
  variant:'warning',
  title:`Falló ${action}`,
  message: `Lo siento, su operación no ha sido completada
  
  ${data}`  
});


module.exports = {
  successMessage,
  failMessage
};