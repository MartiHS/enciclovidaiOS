package com.enciclovida;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
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
    TextView txtVersion = (TextView) findViewById(R.id.version);
    int numero = (int) (Math.random() * 12) + 1;
    switch (numero) {
      case 1:
        layout.setBackgroundResource(R.drawable.fondo1);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 2:
        layout.setBackgroundResource(R.drawable.fondo2);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 3:
        layout.setBackgroundResource(R.drawable.fondo3);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 4:
        layout.setBackgroundResource(R.drawable.fondo4);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 5:
        layout.setBackgroundResource(R.drawable.fondo5);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 6:
        layout.setBackgroundResource(R.drawable.fondo6);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 7:
        layout.setBackgroundResource(R.drawable.fondo7);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 8:
        layout.setBackgroundResource(R.drawable.fondo8);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 9:
        layout.setBackgroundResource(R.drawable.fondo9);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 10:
        layout.setBackgroundResource(R.drawable.fondo10);
        txtVersion.setTextColor(getResources().getColor(R.color.color_white));
        break;
      case 11:
        layout.setBackgroundResource(R.drawable.fondo11);
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