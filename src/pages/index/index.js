import './index.scss';
import $ from 'jquery';

var ajaxPost = function (type,data,success,error) {
  $.ajax({
    url: 'http://10.3.23.180/api/website/koronaNewsletter/addKoronaNewsletter',
    type: type || 'post',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    dataType: 'json',
    success: success,
    error: error
  });
};

$('#clickme').on('click',function(){
  _axios.post('/api/website/koronaNewsletter/addKoronaNewsletter', {
    email: '_axios.test1@qq.com',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
})

$('#sign1').on('click',function(){
  var email1Todo =  new Check('#email1');
  // console.log(email1Todo.isEmail());
  if(email1Todo.isEmail()){
    ajaxPost('post',{email:email1Todo.EleValue},function(res){
      console.log(res);
      if(res.ret == 1){
        new Popup('Congratulations!</br> You have subscribed successfully.')
      }
    },function(err){alert(err)})
  }
})
$('#btn').on('click',function(){
  ajaxPost('post',{email:'test22@qq.com'},function(res){
    console.log(res);
    if(res.ret == 1){
      console.log('Congratulations!</br> You have subscribed successfully.')
    }
  },function(err){alert(err)})
})