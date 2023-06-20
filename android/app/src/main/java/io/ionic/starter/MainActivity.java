package com.visualpathtech.elearn;
import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
   
    @Override
    protected void onCreate(Bundle savedInstanceState) {
       //Log.d("DEBUG","Original oncreate");
        this.initialPlugins.add(GoogleAuth.class);
        super.onCreate(savedInstanceState);



    }
}
