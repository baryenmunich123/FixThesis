import emailjs from "emailjs-com";
export async function sendEmailtoStudents(mailParams) {
  try {
    const resp = await emailjs.send(
      "service_lkssckr",
      "template_zrurawn",
      mailParams,
      "bkhRwgX4pogIC92vo"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendEmailtoStaffs(mailParams) {
  try {
    const resp = await emailjs.send(
      "service_r6sii0t",
      "template_ufi5yka",
      mailParams,
      "bkhRwgX4pogIC92vo"
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
