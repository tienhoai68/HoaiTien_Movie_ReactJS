import React from 'react'
import "./Newsletter.scss"

export default function Newsletter() {
  return (
    <section className="bg-light bg-subscribe section section-inset-1">
      <div className="container">
        <h2 className="text-center title-news">newsletter</h2>
        <hr className="hr-primary" />
        <div className="row justify-content-center offset-custom-3">
          <div className="col-12 col-lg-9 col-xl-6 col-lg-offset-2 col-xl offset-custom-3">
            <p className="fw-l h5 text-transform-none">Enter your email address to receive all news, updates on new arrivals, special offers and other discount information.</p>
            <form className="row rd-mailform subscribe-form-3 offset-top-20" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php" noValidate>
              <div className="mt-2 col-12 col-sm-12 col-md-8 col-lg-8 form-wrap has-error">
                <input className="form-input form-control-has-validation form-control-last-child" placeholder='Your email ...' type="email" name="email" />
              </div>
              <div className="mt-2 col-12 col-sm-12 col-md-4 col-md-4 col-lg-4 button-wrap">
                <button className="btn btn-sm btn-secondary">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
