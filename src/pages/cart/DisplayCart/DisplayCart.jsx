
import './displayCart.css'
function DisplayCart(props) {
    const {total} = props;
    return (
        <div class="container">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-md-9">
            <div class="ibox">
                <div class="ibox-title">
                    <span class="pull-right">(<strong>4</strong>) items</span>
                    <h5>Items in your cart</h5>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table shoping-cart-table">
                            <tbody>
                            <tr>
                                <td width="90">
                                    <div class="cart-product-imitation">
                                    </div>
                                </td>
                                <td class="desc">
                                    <h3>
                                    <a href="#" class="text-navy">
                                        Desktop publishing software
                                    </a>
                                    </h3>
                                    <p class="small">
                                        It is a long established fact that a reader will be distracted by the readable
                                        content of a page when looking at its layout. The point of using Lorem Ipsum is
                                    </p>
                                    <dl class="small m-b-none">
                                        <dt>Description lists</dt>
                                        <dd>A description list is perfect for defining terms.</dd>
                                    </dl>

                                    <div class="m-t-sm">
                                        <a href="#" class="text-muted"><i class="fa fa-gift"></i> Add gift package</a>
                                        |
                                        <a href="#" class="text-muted"><i class="fa fa-trash"></i> Remove item</a>
                                    </div>
                                </td>

                                <td>
                                    $180,00
                                    <s class="small text-muted">$230,00</s>
                                </td>
                                <td width="65">
                                    <input type="text" class="form-control" placeholder="1"/>
                                </td>
                                <td>
                                    <h4>
                                        $180,00
                                    </h4>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table shoping-cart-table">

                            <tbody>
                            <tr>
                                <td width="90">
                                    <div class="cart-product-imitation">
                                    </div>
                                </td>
                                <td class="desc">
                                    <h3>
                                        <a href="#" class="text-navy">
                                            Text editor
                                        </a>
                                    </h3>
                                    <p class="small">
                                        There are many variations of passages of Lorem Ipsum available
                                    </p>
                                    <dl class="small m-b-none">
                                        <dt>Description lists</dt>
                                        <dd>List is perfect for defining terms.</dd>
                                    </dl>

                                    <div class="m-t-sm">
                                        <a href="#" class="text-muted"><i class="fa fa-gift"></i> Add gift package</a>
                                        |
                                        <a href="#" class="text-muted"><i class="fa fa-trash"></i> Remove item</a>
                                    </div>
                                </td>

                                <td>
                                    $50,00
                                    <s class="small text-muted">$63,00</s>
                                </td>
                                <td width="65">
                                    <input type="text" class="form-control" placeholder="2"/>
                                </td>
                                <td>
                                    <h4>
                                        $100,00
                                    </h4>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
          
                           
            </div>

        </div>
        <div class="col-md-3">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Cart Summary</h5>
                </div>
                <div class="ibox-content">
                    <span>
                        Total
                    </span>
                    <h2 class="font-bold">
                    {total}
                    </h2>

                    <hr/>
                    <span class="text-muted small">
                        *For United States, EU Nations - applicable sales tax will be applied
                    </span>
                    <div class="m-t-sm">
                        <div class="btn-group">
                        <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-shopping-cart"></i> Checkout</a>
                        <a href="#" class="btn btn-white btn-sm"> Cancel</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ibox">
                <div class="ibox-title">
                    <h5>Support</h5>
                </div>
                <div class="ibox-content text-center">
                    <h3><i class="fa fa-phone"></i> 9030222850,9154152888</h3>
                    <span class="small">
                        Please contact with us if you have any questions. We are avalible 24h.
                        support@visualpathtech.com
                    </span>
                </div>
            </div>

            <div class="ibox">
                <div class="ibox-content">

                    <p class="font-bold">
                    Other products you may be interested
                    </p>
                    <hr/>
                    <div>
                        <a href="#" class="product-name"> Devops</a>
                        <div class="small m-t-xs">
                            Many desktop publishing packages and web page editors now.
                        </div>
                        <div class="m-t text-righ">

                            <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <a href="#" class="product-name"> AI</a>
                        <div class="small m-t-xs">
                            Many desktop publishing packages and web page editors now.
                        </div>
                        <div class="m-t text-righ">

                            <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    );
}

export default DisplayCart;
