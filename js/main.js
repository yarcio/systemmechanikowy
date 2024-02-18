async function main() {
  async function sendData(func, vars) {
      const formData = new FormData();
  
      formData.append("func", func);
      if (vars!=null) formData.append("vars", vars);
      try {
      const response = await fetch("/main.php", {
          method: "POST",
          body: formData,
      });
      return await response.json();
      } catch (e) {
      console.error(e);
      }
  }
  // var funcname = "test";
  // var json = [3, 4];
  // alert(await sendData(funcname, JSON.stringify(json)));
}
main();