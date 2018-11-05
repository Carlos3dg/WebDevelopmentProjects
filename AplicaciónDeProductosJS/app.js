//CLASS
//Clase para Productos
class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//Interface class (those methods used in many part of the code)
class UI {
    addProductsToDOM(newProduct){
        const productList = document.getElementById('product-list');

        const productContent = document.createElement('div');
        productContent.className = 'card text-center mb-4';
        productContent.innerHTML = `
                <div class="card-body">
                    <strong>Product Name</strong>: ${newProduct.name}
                    <strong>Price</strong>: ${newProduct.price}
                    <strong>Year</strong>: ${newProduct.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
        `;

        productList.appendChild(productContent);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProducts(product){
        if (product.name === 'delete'){
            product.parentElement.parentElement.remove();
            this.showMessage('Product deleted successfully', 'info');
        }
    }

    showMessage(message, type) {
        const messageLoad = document.createElement('div');
        messageLoad.className = `alert alert-${type} mt-3`;

        messageLoad.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const app = document.getElementById('app');

        container.insertBefore(messageLoad, app);

        setTimeout(function(){
            messageLoad.remove();
        }, 3500);
    }


}

//EVENT LISTENERS
//Form
document.getElementById('product-form').addEventListener('submit', submitProducts);

//Class List Container
document.getElementById('product-list').addEventListener('click', deleteProduct);

//FUNCTIONS
function submitProducts(e) {
    //Saving inputs values
    const nameProduct = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    //Creating a new instance of Product class
    const newProduct = new Product(nameProduct, price, year);
    //Creating a new instance of UI class
    const ui = new UI();
    //Validation Form
    if(nameProduct === '' || price === '' || year === ''){
        return ui.showMessage('Please complete the form fields', 'danger');
    } 
    //Calling to addProductsToDOM() method from UI class
    ui.addProductsToDOM(newProduct); //Sendind newProduct const as a parameter value
    //Calling to resetForm() method to clean the form
    ui.resetForm();
    //
    ui.showMessage('Product Added successfully', 'success');
    
    e.preventDefault();

}

function deleteProduct(e) {
    const ui = new UI();

    ui.deleteProducts(e.target);
}