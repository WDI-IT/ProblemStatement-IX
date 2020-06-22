function _xhr(link, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', link);
    xhr.send(data);
    return new Promise(function (res, rej) {
        xhr.onreadystatechange = function () {
            this.readyState === 4 ? this.status === 200 ? res(this.response) : rej(this.status) : false;
        }
    })
}
Vue.component('product-detail', {
    props: ['data-action', 'product'], 
    // dataAction value -> add, edit, read
    // product properties -> Name, imgsrc, description, _id
    template:
    `<div id= 'prod-det'>
        <div class= '_pd'>
            <form>
            <label>Product Id : <input type= 'text' class= '_inp' placeholder= 'Product ID' v-if= 'showId' readonly= 'true' v-bind:value= 'id'></label>
                <label>Product Name : <input type= 'text' class= '_inp' placeholder= 'Product Name' v-model= 'name' v-bind:readonly= 'readOnly' /></label>
                <label v-if= 'showLinkInput'>Product Image (link) : <input type= 'text' class= '_inp' placeholder= 'Image Link' v-model= 'link' /></label>
                <label>Project Description
                <textarea class= '_inp' placeholder= 'Description' v-model= 'des' v-bind:readonly= 'readOnly' ></textarea>
                </label>
                <button v-if= 'showBtn' v-bind:class= 'btnClass' @click.prevent = 'btnHandler'>{{btnText}}</button>
            </form>
        </div>
        <div class= '_ip'>
            <img v-bind:src= 'imgsrc' width= '200' height= '200' alt= 'Image Preview' />
        </div>
    </div>
    `,
    data: function () {
        return {
            name: this.$props.product.Name || '',
            link: this.$props.product.imgsrc || '',
            des: this.$props.product.description || '',
            id: this.$props.product._id || '',
            imgsrc: this.$props.product.imgsrc || 'https://cdn.glitch.com/e44b870a-8d18-408a-bbc5-a5b255fcb479%2Fnoimage.png?v=1592561220915',
            btnClass: 'btn _n', // button style
            readOnly: false,  // to render the inputs readonly or writable
        }
    },
    computed: {
        productDetail: function () {
            var { name, des, link, id } = this;
            return {
                name : name,
                des : des,
                link : link,
                id : id
            }
        },
        // to check whether to display link input or not
        showLinkInput: function () {
            if (this.$props.dataAction === 'add' || this.$props.dataAction === 'edit') {
                // makes input writable
                this.readOnly = false;
                // if component action is add the initial value of product data is changed to ''
                if (this.$props.dataAction === 'add') {
                    this.name = ''; this.des = ''; this.link = ''; this.id = '';
                }
                // show link input
                return true;
            } else {
                this.readOnly = true;
                return false
            }
        },
        // text of action button in the component
        btnText: function () {
            if (this.$props.dataAction === 'read') {
                return ''
            } else {
                this.btnClass= 'btn _'+this.$props.dataAction.charAt(0);
                return this.$props.dataAction.toUpperCase()
            };
        },
        // show button or not
        showBtn: function () {
            if (this.$props.dataAction === 'read') {
                return false
            } else return true
        },
        // show product id
        showId: function () {
            if (this.$props.dataAction !== 'add') {
                return true
            } else return false
        }
    },
    watch: {
        link(val) {
            // if the value is '' then show default 'no-image' image
            this.imgsrc = val;
            if (val === '') {
                this.imgsrc = 'https://cdn.glitch.com/e44b870a-8d18-408a-bbc5-a5b255fcb479%2Fnoimage.png?v=1592561220915'
            }
        }
    },
    methods: {
        btnHandler() {
            switch (this.$props.dataAction) {
                // when tha add button is pressed
                // collects data and inserts in to the database
                case 'add': {
                    var productData = new FormData();
                    for (var data in this.productDetail) {
                        productData.append(data, this.productDetail[data])
                    }
                    _xhr('/add', productData).then((uid) => {
                        alert(`Product added with id ${uid}!`);
                        this.$emit('del');
                    }).catch(e => {
                        alert('Product not added !')
                    })
                    break;
                };
                // when the edit button is pressed
                // collects changed/unchanged data and updates the database
                case 'edit': {
                    var productData = new FormData();
                    for (var data in this.productDetail) {
                        productData.append(data, this.productDetail[data])
                    };
                    _xhr('/change/'+this.productDetail.id, productData).then(() => {
                        alert('Product updated !');
                        this.$emit('del')
                    }).catch(e => {
                        alert('Product not updated !');
                    })
                    break;
                }
                // when delete button is pressed
                // doesntot delete from database
                case 'delete': {
                    this.$emit('del')
                    break;
                }
            }
        }
    }
})