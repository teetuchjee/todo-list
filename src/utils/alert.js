import Swal from "sweetalert2/dist/sweetalert2.js";

class Alert {
  confrim(successMassge, handleDelete) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
    }).then((e) => {
      if (e.isConfirmed) {
        handleDelete();
        this.success(successMassge);
      }
    });
  }

  success(msg) {
    Swal.fire({
      title: "System",
      text: msg,
      icon: "success",
      customClass: {
        container: "my-swal",
      },
    });
  }
}

export default new Alert();
