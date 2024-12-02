<template>
  <div class="banner">
    <div class="parent">
      <img src="../../assets/images/banner-bg.jpg" alt="" />
      <div class="content">
        <h3><span>Huge Saving</span> on UHD Televisions</h3>
        <p class="hint">Sale up to 70% off on selected items*</p>
        <v-btn
          style="border-radius: 30px; text-transform: capitalize"
          variant="outlined"
          density="compact"
          height="46"
          width="150"
          >shop now</v-btn
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.banner {
  .parent {
    height: 390px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .content {
      color: white;
      padding-top: 40px;
      padding-left: 80px;
      position: absolute;
      left: 40px;
      top: 20px;
      width: 600px;
      h3 {
        font-size: 48px;
        font-weight: 900;
        span {
          color: rgb(45 251 223);
        }
      }
      .hint {
        margin-top: 20px;
        margin-bottom: 40px;
      }
    }
  }
}

// Media Queris

@media (max-width: 767px) {
  .banner {
    .parent {
      .content {
        h3 {
          font-size: 35px;
        }
        width: 500px;
        left: 0;
      }
    }
  }
}

@media (max-width: 767px) {
  .banner {
    .parent {
      height: 320px;
      .content {
        padding-left: 20px;
        h3 {
          font-size: 30px;
        }
        width: 500px;
        left: 0;
        .hint {
          font-size: 14px;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .banner {
    .parent {
      height: 250px;
      .content {
        padding-left: 20px;
        padding-top: 20px;
        h3 {
          font-size: 24px;
        }
        width: 80%;
        left: 0;
        .hint {
          font-size: 12px;
        }
        button {
          height: 30px !important;
          width: 130px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
