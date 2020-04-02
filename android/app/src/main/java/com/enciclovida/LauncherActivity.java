package com.enciclovida;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.enciclovida.R;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {

  Activity activity;
  private static long tiempo = 1500;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_launcher);
    activity = this;

    RelativeLayout layout = (RelativeLayout) findViewById(R.id.activity_launcher);
    ImageView img = (ImageView) findViewById(R.id.imageView);
    TextView txtVersion = (TextView) findViewById(R.id.version);
    int numero = (int) (Math.random() * 12) + 1;
    switch (numero) {
      case 1:
        img.setImageResource(R.drawable.fondo1);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 2:
        img.setImageResource(R.drawable.fondo2);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 3:
        img.setImageResource(R.drawable.fondo3);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 4:
        img.setImageResource(R.drawable.fondo4);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 5:
        img.setImageResource(R.drawable.fondo5);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 6:
        img.setImageResource(R.drawable.fondo6);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 7:
        img.setImageResource(R.drawable.fondo7);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 8:
        img.setImageResource(R.drawable.fondo8);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 9:
        img.setImageResource(R.drawable.fondo9);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 10:
        img.setImageResource(R.drawable.fondo10);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 11:
        img.setImageResource(R.drawable.fondo11);
        txtVersion.setTextColor(getResources().getColor(R.color.color_black));
        break;
    }

    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        Intent mainIntent = new Intent().setClass(activity, MainActivity.class);
        startActivity(mainIntent);
        finish();
      }
    }, tiempo);

  }
}