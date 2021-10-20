import React from "react";
import { toast } from 'react-toastify'

const FormView = () => {

    return (
        <div className="container">
            <h2 className="text-center">Contac Form</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 pb-5">
                    <form action="mail.php" method="post">
                        <div className="card border-primary rounded-0">
                            <div className="card-header p-0">
                                <div className="bg-info text-white text-center py-2">
                                    <h3><i className="fa fa-envelope"></i> Contactanos</h3>
                                    <p className="m-0">Con gusto te ayudaremos</p>
                                </div>
                            </div>
                            <div className="card-body p-3">

                                {/* <!--Body--> */}
                                <div className="form-group">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                        </div>
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre y Apellido" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                        </div>
                                        <input type="email" className="form-control" id="nombre" name="email" placeholder="ejemplo@gmail.com" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                                        </div>
                                        <textarea className="form-control" placeholder="Envianos tu Mensaje" required></textarea>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <input type="submit" value="Enviar" className="btn btn-info btn-block rounded-0 py-2" />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default FormView