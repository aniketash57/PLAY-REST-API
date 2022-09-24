

window.onload = () => {

    let submit = document.querySelector('.submit');
    var form = document.getElementsByName('contact-form')[0];
    
    submit.onclick = function(e) {
        e.preventDefault();
        let lng = document.querySelector("input.lng");
        let lat = document.querySelector("input.lat");
        let url = `/api/customers?lng=${lng.value}&lat=${lat.value}`;
    
        fetch(url).then( (data) => {
    
            return data.json();
    
        }).then(( myCustomers) => {
    
        let obj = myCustomers;
    
            for(let i = 0; i < obj.length; i++) {
    
         let customers_found = `
            
        <li>
            <span>Name: ${obj[i].name}</span>
            <span>Age: ${obj[i].age}</span>
        </li>
    
            `;
            document.querySelector("#customers").innerHTML += customers_found;
            
                }
              
        });
    
        form.reset();
    
        document.querySelector("#customers").innerHTML = '';
        
    };
    
    };