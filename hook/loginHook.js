import {
  getCaptcha,
  verificateCode,
  login
} from "@/api/api.js"
import userStore from "@/store/userStore.js"
export const loginHook = () => {

  let model = reactive({
    loginForm: {
      phone: undefined,
      password: undefined,
      code: undefined
    }
  })

  const from = ref(null);

  const rules = {
    'loginForm.phone': [{
        type: 'string',
        required: true,
        message: '请输入手机号',
        trigger: ['submit']
      },
      {
        validator: (rule, value, callback) => {
          return /^1[3-9]\d{9}$/.test(value);
        },
        message: '手机号码不正确',
        trigger: ['submit'],
      }
    ],
    'loginForm.password': {
      type: 'string',
      required: true,
      message: '请输入密码',
      trigger: ['submit']
    },
    'loginForm.code': {
      type: 'string',
      required: true,
      message: '请输入验证码',
      trigger: ['submit']
    },
  }

  return {
    model,
    from,
    rules
  }
}


export const readSecound = (from) => {
  let seconds = ref(60);
  let disable = true;
  let flag = ref(false);
  let Interval = ref(null);
  const getCode = () => checkPhone();

  const checkPhone = async () => {
    if (!from.phone) {
      uni.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return;
    }

    const reg = /1[3-9]\d{9}$/;
    if (!reg.test(from.phone)) {
      uni.showToast({
        title: '请输入正确手机号',
        icon: "none"
      })
      return;
    }
    // 显示
    flag.value = true;
    // 倒数
    countDownSecound();
    // 提示
    uni.showToast({
      title: '验证码已发出',
      icon: 'none'
    })

    await getCaptcha(from.phone);
  }

  const countDownSecound = () => {
    Interval = setInterval(() => {
      seconds.value--;
      if (seconds.value < 0) {
        seconds.value = 60;
        flag.value = false;
        clearInterval(Interval);
        Interval = null;
      }
    }, 1000)
  }
  return {
    countDownSecound,
    seconds,
    flag,
    disable,
    getCode
  }
}


export const loginActionHook = () => {
  const loginUser = async (form) => {
    try {
      await verificateCode(form.phone, form.code);
      const result = await login(form.phone, form.password, form.code);
      if (result.code === 200) {
        setUserInfo(result);
      }
    } catch (e) {
      uni.showToast({
        title: '验证码有误',
        icon: 'none'
      })
    }
  }


  const setUserInfo = (data) => {
    const {
      account,
      cookie,
      profile,
      token
    } = data;
    const userStores = userStore();
    userStores.setInfo({
      account,
      cookie,
      profile,
      token
    });
    uni.navigateTo({
      url:'/pages/home/home'
    })
  }

  return {
    loginUser
  }
}
