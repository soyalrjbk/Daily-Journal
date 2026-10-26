var trash = document.getElementsByClassName("delete");
var savBtn = document.getElementsByClassName("save");

//Delete
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const id = this.parentNode.parentNode.dataset.id
    fetch('journal', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

//Update
Array.from(savBtn).forEach(function(element) {
  element.addEventListener('click', function(){
    const id = this.parentNode.parentNode.dataset.id
    const message = this.parentNode.querySelector('.edit').value
    fetch('journal', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(function (response) {
      window.location.reload()
    })
  });
});