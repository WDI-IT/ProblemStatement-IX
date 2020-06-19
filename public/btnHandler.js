var vm;
window.addEventListener('load', function () {
    // Vue view model
    vm = new Vue({
        el: '#form-disp',
        data: function () {
            return {
                // default will show add product form
                comp: 'product-detail', //component name
                compAction: 'add', // component action
                products: [{
                    Name: '',
                    imgsrc: '',
                    description: '',
                    id: ''
                }]
            }
        },
        computed: {
            title: function () {
                if (this.compAction === 'edit') {
                    return 'Edit the Product'
                } else if (this.compAction === 'add') {
                    return 'Add a Product'
                } else if (this.compAction === 'delete') {
                    return 'Delete the Product'
                } else return 'Product(s)'
            }
        },
        methods: {
            // reset the view model and erase all data
            clear() {
                this.comp = '';
                this.products = [{
                    Name: '',
                    imgsrc: '',
                    description: '',
                    id: ''
                }]
            },
        }
    })

    // DOM objects 
    var doc = document;
    var btnAdd = doc.getElementById('_add');
    var btnEdit = doc.getElementById('_edit');
    var btnDel = doc.getElementById('_del');
    var btnList = doc.getElementById('_list');
    var prodId = doc.getElementById('prod_id');

    // attach event listeners to buttons
  
    // setting coponent action to add
    btnAdd.addEventListener('click', function () {
        prodId.value = '';
        vm.comp = 'product-detail';
        vm.compAction = 'add';
        vm.products = [{
            Name: null,
            imgsrc: null,
            description: null,
            id: null
        }]
    });
    
    // get product details by product id using ajax
    // and display them
    btnEdit.addEventListener('click', function () {
        var productId = prodId.value;
        if (productId !== '') {
            vm.clear();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/get/' + productId);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    vm.comp = 'product-detail';
                    vm.compAction = 'edit';
                    var parsed = JSON.parse(this.response)
                    if (parsed.length === 0) {
                        alert('Invalid Product Id')
                    } else vm.products = JSON.parse(this.response);
                }
            }
        } else alert('Product ID cannot be empty !')
    })
  
    // get product details by product id using ajax
    // and display them
    btnDel.addEventListener('click', function () {
        var productId = prodId.value;
        if (productId !== '') {
            vm.clear();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/get/' + productId);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    vm.comp = 'product-detail';
                    vm.compAction = 'delete';
                    var parsed = JSON.parse(this.response);
                    if (parsed.length === 0) {
                        alert('Invalid Product Id')
                    } else vm.products = JSON.parse(this.response);
                }
            }
        } else alert('Product ID cannot be empty !')
    })
  
    // get all the products
    btnList.addEventListener('click', function () {
        vm.clear();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/get/all');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                vm.comp = 'product-detail';
                vm.compAction = 'read';
                vm.products = JSON.parse(this.response);
            }
        }
    })
})